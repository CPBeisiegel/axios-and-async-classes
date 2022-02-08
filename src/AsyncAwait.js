import axios from "axios";
import { useState, useEffect } from "react";

// async e await é uma sintaxe que utilizamos para escrever funções assincronas
// Utilizamos o await na frente de promises dentro da nossa função
// O await "pausa" a execução do seu codigo naquela linha, esperando o termino da execução da promise

export function AsyncAwait() {
  const [films, setFilms] = useState([]);

  // A CALLBACK DO USEEFFECT NÃO PODE SER ASSINCRONA, RESOLVEMOS ISSO ESCREVENDO UMA OUTRA FUNÇÃO DENTRO DA CALLBACK E INVOCANDO ELA NA SEQUENCIA
  useEffect(() => {
    // Criando uma nova função dentro da callback do useEffect, essa pode ser assincrona
    async function fetchMovies() {
      // A sintaxe try/catch separa um bloco de codigo para ser testado, se ocorrer tudo bem, ele segue no try, se ocorrer algum erro, cai no catch
      try {
        // Criamos uma variavel para guardar o resultado do axios.get. Os metodos do axios que fazem chamada HTTP retornam promises, logo colocamos o await na frente dele para esperar a resolução da promise antes de seguir em frente
        // Os parametros passados para os metodos do axios são o que chamamos de endpoints, basicamente, são URL que tem seu funcionamento programado para responder o que se pede, cada endpoint está preparado para responder algo especifico
        // Precimos ler sempre as documentações para entender qual endpoint usar em cada caso
        const result = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?api_key=1dbc566a4812e099606bf66f83159d6e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
        );
        // Apos a resolução da promise, eu guardo os dados que trouxe da API no meu state
        // Os dados de retorno da API vão está sempre no result.data
        setFilms([...result.data.results]);
      } catch (error) {
        console.error(error);
      }
    }

    // Invocando a função que criei dentro da callback do useEffect
    fetchMovies();
  }, []);

  return (
    <div>
      {films.map((currentMovie) => {
        return <p>currentMovie.original_title</p>;
      })}
    </div>
  );
}
