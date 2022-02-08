// O axios é uma biblioteca que nos ajuda quando precisamos fazer requisições HTTP
// Para usar, primeiro precisamos instalar o pacote dele (npm install axios // yarn add axios) e importar ele em todos os componentes que vamos fazer chamadas HTTP
// O axios vai nos ajudar a conectar nosso projeto React com o back-end e API externas
// Esse componente, estamos utilizando a sintaxe THEN/CATCH, ela é necessaria porque os metodos do axios sempre vão retorna uma PROMISE!

import axios from "axios";
import { useState, useEffect } from "react";

export function ThenCatch() {
  const [films, setFilms] = useState([]);

  // Vamos utilizar o useEffect com a sua array de dependecia (segundo parametro) vazia, dessa maneira, ele vai ser executado apenas na rederização do componente
  // Como o useEffect é executado logo no começo da montagem do componente, ele é perfeito para fazer requisições HTTP que demoram um tempo para serem concluidas
  useEffect(() => {
    // O axios possui varios metodos, os principais são os GET, POST, PUT, PATCH e DELETE.
    // Nesse caso, estamos pedindo informações da API, então, o ideal é usar o GET
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=1dbc566a4812e099606bf66f83159d6e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
      )
      // Como dito antes, a invocação dos metodos do axios vão retornar sempre uma PROMISE.
      // Para lidar com elas, precimos trabalhar com JavaScript Assincrono
      // Nesse exemplo, estamos utilizando a sintaxe THEN/CATCH
      // A ideia por trás dessa sintaxe é ter um bloco de codigo que será executado APÓS a promise ser resolvida (só teremos acesso aos dados da API no momento que ela terminar a execução)
      // O then recebe uma callback como parametro, e essa callback recebe o result (o resultado retornado pela promise) como argumento
      .then((result) => {
        console.log(result);
        // Utilizamos o setFilms para atualizar nosso state com os dados vindos da API (result.data)
        // O .results no final da expressão abaixo é por conta do formato que essa API, especificamente, retorna dados para nos.
        setFilms(result.data.results);
      })
      // O catch está aqui para ajudar no tratamento de erros que podem vir da Promise
      // Basicamente, se algo der errado na execução da promise, caimos no catch, o bloco de codigo dentro do THEN não é executado e damos um console.error no erro que foi retornado
      .catch((error) => {
        console.error(error);
      });

    // Array de dependecia (segundo parametro do useEffect) vazia abaixo
  }, []);

  // Usamos o map para renderizar arrays no react.
  // Cada elemento do array vai renderizar um elemento html diferente na tela

  return (
    <div>
      {films.map((currentMovie) => (
        <p>{currentMovie.original_title} </p>
      ))}
    </div>
  );
}
