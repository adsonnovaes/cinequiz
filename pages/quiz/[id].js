import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({dbExterno}) {
    return(
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            
            />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    const [projectName, gitHubUser] = context.query.id.split('___');

    try {
        const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
        .then((responseServer) => {
            if(responseServer.ok){
                return responseServer.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((responseConvObject) => responseConvObject)
        .catch((err) => {
            console.error(err);
        });
    
        return {
            props: {
                dbExterno,
            }
        }; 
        
    } catch (error) {
        throw new Error(err)
    }
}