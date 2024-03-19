import {Container, Profile, Logout} from "./styles"
import {RiShutDownLine} from "react-icons/ri"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { useAuth } from "../../hooks/auth"

export function Header()
{

    const { user } = useAuth()

    const navigate = useNavigate()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    function handleSignOut()
    {
        //navigate("/")
        signOut()
        navigate("/")
    }

    const { signOut } = useAuth()

    return(
        <Container>

            <Profile to="/profile">

                <img src={avatarUrl} alt={ user.name } />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{ user.name }</strong>
                </div>

            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine/>    
            </Logout> 
                      
        </Container>
    )
}