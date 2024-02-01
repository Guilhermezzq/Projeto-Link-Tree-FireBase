
import { FormEvent, useEffect, useState } from "react"

import { Header} from "../../components/header/header"

import { Input } from "../../components/input/input"

import { db } from "../../services/FireBaseConnection";

import { setDoc,
         doc,
         getDoc

} from 'firebase/firestore'



export function NetWorks() {

    const[github, setGitHub] = useState("");
    const[instagram, setInstagram] = useState("");
    const[youtube, setYouTube] = useState("");
    const[linkedin, setLinkedin] = useState("");


    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "Link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setGitHub(snapshot.data()?.github)
                    setInstagram(snapshot.data()?.instagram)
                    setYouTube(snapshot.data()?.youtube)
                    setLinkedin(snapshot.data()?.linkedin)
                }

            })
        }

        loadLinks();
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            github: github,
            instagram: instagram,
            youtube: youtube,
            linkedin: linkedin
        })
        .then(() => {
            console.log("CADASTRADOS COM SUCESSO");
        })
        .catch((error) => {
            console.log("ERRO AO SALVAR" + error)
        })
    }




    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2" >
            <Header/>
            
            <h1 className="text-white text-2xl font-medium mt-8 mb-4" >Minhas rede sociais</h1>


            <form className="flex flex-col max-w-xl w-full"
            onClick={handleRegister}>


            <label className="text-white font-medium mt-2 mb-2" > Link do GitHub</label>
                <Input 
                type="url"
                placeholder="Digite a  url do github..."
                value={github}
                onChange={ (e) => setGitHub(e.target.value)}
                
                />


                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                
                <Input
                    type="url"
                    placeholder="Digite a  url do github..."
                    value={instagram}
                    onChange={ (e) => setInstagram(e.target.value)}
                />

                

                <label className="text-white font-medium mt-2 mb-2">Link do YouTube</label>
                <Input
                type="url"
                placeholder="Digite a  url do instagram..."
                value={youtube}
                onChange={ (e) => setYouTube(e.target.value)}
                
                />



               <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
               <Input
                type="url"
                placeholder="Digite a  url do github..."
                value={linkedin}
                onChange={ (e) => setLinkedin(e.target.value)}

                />

                <button
                type="submit"
                className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                >
                Salvar Links
                </button>



            </form>

        </div>
    )
}