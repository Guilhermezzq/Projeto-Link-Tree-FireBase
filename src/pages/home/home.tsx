import { useEffect, useState } from "react"

import { Social } from "../../components/social/social"

import { FaInstagram, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa"

import { db } from "../../services/FireBaseConnection"

import { 
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'


interface LinkProps {
    id: string;
    name:string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    github: string;
    instagram: string;
    youtube: string;
    linkedin: string;

}



export function Home() {

    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        function LoadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color,
                    })
                })

                setLinks(lista);
            })
        }
 

        LoadLinks();

    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setSocialLinks({
                    github: snapshot.data()?.github,
                    instagram: snapshot.data()?.instagram,
                    youtube: snapshot.data()?.youtube,
                    linkedin:snapshot.data()?.linkedin,
                    })
                }
            })
        }

        loadSocialLinks();

    }, [])

    








    return (
        <>

        <div className="flex flex-col  w-full py-4 items-center justify-center">

            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20"> Encontre seu links</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 📌</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                
                {links.map((link) => (
                    <section 
                    style={{ background: link.bg }}
                    key={link.id}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition">
                    <a href={link.url} target="_blank" >
                        <p
                        style={{ color: link.color }} 
                        className="text-base md:text-lg">
                           {link.name}
                        </p>
                    </a>
                </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                    <Social url={socialLinks?.instagram}>
                    <FaInstagram size={35} color="#FFF"/>
                   </Social>

                   <Social url={socialLinks?.youtube}>
                    <FaYoutube size={35} color="#FFF"/>
                   </Social>

                   <Social url={socialLinks?.github}>
                    <FaGithub size={35} color="#FFF"/>
                   </Social>

                   <Social url={socialLinks?.linkedin} >
                    <FaLinkedin size={35} color="#FFF"/>
                   </Social>

               </footer>
                )}

            </main>

        </div>


        </>
    )
}