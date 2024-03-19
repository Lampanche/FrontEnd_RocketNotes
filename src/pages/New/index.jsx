import { useState } from "react"

import { api } from "../../services/api"

import { Container, Form } from "./styles"

import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"


export function New()
{

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [ links, setLinks ] = useState([])
    const [newLink, setNewLink] = useState("")

    const [ tags, setTags ] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleAddLink()
    {
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(linkDeleted)
    {
        setLinks(prevState => prevState.filter(link => link !== linkDeleted))
    }

    function handleAddTag()
    {
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(tagDeleted)
    {
        setTags(prevState => prevState.filter(tag => tag !== tagDeleted))
    }


    async function handleNewNote()
    {

        if(!title)
        {
            return alert("Digite o título da nota para salvar.")
        }

        if(!description)
        {
            return alert("Digite a descrição da nota para salvar.")
        }

        if(newTag)
        {
            return alert("Você deixou uma tag no campo para adicionar, mas não adicionou.")
        }

        if(newLink)
        {
            return alert("Você deixou um link no campo para adicionar, mas não adicionou.")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })
        
        alert("Nota cadastrada com sucesso.")

        navigate(-1)

    }

    function handleBack()
    {
        navigate(-1)
    }


    return(

        <Container>

            <Header/>

            <main>

                <Form>

                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText 
                        title="Voltar"
                        onClick={handleBack}
                        >
                        </ButtonText>
                    </header>

                    <Input
                    placeholder="Título" 
                    onChange={e => setTitle(e.target.value)}
                    />

                    <TextArea 
                    placeholder="Observações"
                    onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">

                        {
                            links.map((link, index) => (
                            <NoteItem
                            key={String(index)} 
                            value={link}
                            onClick={() => { handleRemoveLink(link) }}
                            />
                            ))
                        }

                            <NoteItem 
                            isNew placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                            />
                        

                    </Section>

                    <Section title="Marcadores">

                        <div className="tags">

                            {
                                tags.map((tag, index) =>(
                                <NoteItem
                                key={String(index)} 
                                value={tag}
                                onClick={() => { handleRemoveTag(tag) }}
                                />

                                ))
                            }

                            <NoteItem 
                            isNew placeholder="Nova tag" 
                            onChange={e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}
                            />

                        </div>

                    </Section>

                    <Button 
                    title="Salvar" 
                    onClick={ handleNewNote }
                    />

                </Form>

            </main>

        </Container>

    )
}