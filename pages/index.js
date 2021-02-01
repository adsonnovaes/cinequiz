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
        <Widget>
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

        <Widget>

          <Widget.Content>
            <h1>Quiz da Galera</h1>

            <p>Há alguma coisa escrita para não passar batido</p>
          </Widget.Content>

        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/adsonnovaes" />
    </QuizBackground>
  );
}
