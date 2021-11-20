import React, {components} from 'react';
import { Component } from 'react';
import { isElementOfType } from 'react-dom/test-utils';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
     const elemento = document.querySelector('.jumbotron');
     elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () =>{
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;
    //Si la pagina es uno, no puede ir atras
    if(pagina === 1) return null;
    //Restar uno a la pagina actual
    pagina -= 1;
    //agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () =>{
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;
    //Sumar uno a la pagina actual
    pagina += 1;
    //agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=25&page=${pagina}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado =>this.setState({imagenes : resultado.hits }))

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes.</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );

  }
}

export default App;
