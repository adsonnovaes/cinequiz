import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import {useRouter} from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
// import Link from '../src/components/Link';
import { motion } from 'framer-motion';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default function Home() {
  const router = useRouter();
  const [name,setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>CineQuiz - Home</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
          <Widget 
            as={motion.section}
          transition={{ delay: 0, duration: 0.5}}
            variants={{
              show: {opacity: 1, y: '0'},
              hidden: {opacity: 0, y: '100%'},
            }}
            initial="hidden"
            animate="show"
          
        >
          <Widget.Header>
            <h1>Hístoria do Cinema</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function name(infoEvent) {
              infoEvent.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <p>Teste seus conhecimentos sobre o mundo do cinema.</p>
              <Input 
                name="nomeDoUsuario"
                onChange={(infoEvent) => setName(infoEvent.target.value)}
                placeholder="Digite seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5}}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
        >

          <Widget.Content>
            <h1>Quiz da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, gitHubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={linkExterno}>
                    <Widget.Topic href={`/quiz/${projectName}___${gitHubUser}`}>
                      {`${gitHubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>

        </Widget>
        <Footer 
          as={motion.footer}
          transition={{ delay: 0.5, duration: 0.5}}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/adsonnovaes" />
    </QuizBackground>
  );
}
