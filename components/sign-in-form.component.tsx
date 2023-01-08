import InputComponent from "./input.component";
import styled from "styled-components";
import {useForm, FormProvider} from "react-hook-form";
import {signInResolver} from "../utils/yup-form-schemas/sign-in-schema";
import {useContext} from "react";
import {ModalSignInContext} from "../contexts/sign-in-modal.context";
import {useSession, signIn, signOut} from "next-auth/react";
import {UserContext} from "../contexts/user.context";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 20px;
`

const CustomShopButton = styled.button`
  border: 1px solid rgb(58,167,51);
  background-color: rgb(58,167,51);
  color: white;
  height: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OrContainer = styled.p`
  text-align: center;
  margin-top: 30px;
`

interface IFormValues {
    email: string,
    password: string
}

const SignInFormComponent = () => {
    const methods = useForm<IFormValues>({resolver: signInResolver});
    const {setIsSignUpModalOpen, setIsSignInModalOpen} = useContext(ModalSignInContext);
    const {setIsUserAuthenticated} = useContext(UserContext);
    const createAccountClickHandler = () => {
        setIsSignInModalOpen(false);
        setIsSignUpModalOpen(true);
    }

    const {data: session} = useSession();
    console.log(session);
    const handleGoogleSignIn = async () => {
        await signIn('google', {callbackUrl: "http://localhost:3000"});
        setIsUserAuthenticated(true);
    }

    return(
        <FormProvider {...methods}>
            <FormContainer onSubmit={methods.handleSubmit((data)=>console.log(data))}>
                <InputComponent imageUrl="/icons/person.svg" type="text" name="email" placeholder="Your email..."/>
                <InputComponent imageUrl="/icons/password.svg" type="password" name="password" placeholder="Your password..."/>
                <ButtonsContainer>
                    <CustomShopButton type="submit">Sign In</CustomShopButton>
                    <CustomShopButton type="button" onClick={handleGoogleSignIn}>Sign In With Google</CustomShopButton>
                    <CustomShopButton type="button">Sign In With Github</CustomShopButton>
                    <OrContainer>Don't have an account?</OrContainer>
                    <CustomShopButton type="button" onClick={createAccountClickHandler}>Create an account</CustomShopButton>
                </ButtonsContainer>
            </FormContainer>
        </FormProvider>
    )
}

export default SignInFormComponent

