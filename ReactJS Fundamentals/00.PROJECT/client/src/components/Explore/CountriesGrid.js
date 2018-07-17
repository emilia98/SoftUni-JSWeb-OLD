import React, { Component } from 'react';
import CountryCell from './CountryCell';
import { connect } from 'react-redux';

class CountriesGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: []
    };

   // this.renderAll = this.renderAll.bind(this);

    // this.countries = [];

  }

  /*
  
  /*
  componentWillUpdate() {

  }
  */
  /*
   componentWillReceiveProps(nextProps) {
     this.setState({ data: nextProps.sortFunc });  
   }
 */
/*
  async componentDidMount() {
    // console.log(this.props.sortFunc);
    let url = `http://localhost:8080/explore/country/all?sort=${this.props.sortFunc}`;
    let getAll = await fetch(url, {
      method: 'GET'
    });

    getAll = await getAll.json();
     // console.log(getAll);
    await this.setState({
      countries: getAll.countries
    });
    // console.log('here')
  }

  
  async shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps);
    if (nextProps.sortFunc === this.props.sortFunc) {
      return false;
    }

    //console.log('dadadadadadada');
    //console.log(this.state);
    // console.log(nextProps.sortFunc);
    //if (nextProps.sortFunc !== this.props.sortFunc) {
      let url = `http://localhost:8080/explore/country/all?sort=${nextProps.sortFunc}`;
      let getAll = await fetch(url, {
        method: 'GET'
      });

      getAll = await getAll.json();
      // this.countries = await getAll;
      await this.setState({
        countries: getAll.countries
      });
      // console.log('2');
      // console.log(getAll);
  }
  

  /*

//TODO: to replace it with NOT-LEGACY Version
async UNSAFE_componentWillReceiveProps(nextProps) {
  if (nextProps.sortFunc !== this.props.sortFunc) {
    let url = `http://localhost:8080/explore/country/all?sort=${nextProps.sortFunc}`;
    let getAll = await fetch(url, {
      method: 'GET'
    });

    getAll = await getAll.json();
    this.setState({
      countries: 'Nedyalkova'
    });
  }

  //console.log(this.state);

  // console.log('aaaaaaaaaaa');
}
*/
/*
renderAll() {
  return (
    
  )
  for(let country of this.props.countries) {
    console.log(country);
  }
}
*/
//TODO: Potential problem: isLoggedIn
   render() {
     console.log(this.props.auth);
     if (this.props.auth === null || this.props.countries === undefined) {
      return (
        <div>Still Loading...</div>
      );
    }
    return (
      <div id="explore-countries">
         {
           this.props.countries.map(el => {
             // console.log(el);
             return <CountryCell id={el.id} isoCode={el.isoCode} countryName={el.displayName}
                isLoggedIn={!(this.props.auth === null || this.props.auth === false)}/>
           })
         }
      </div>
    );
   
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(CountriesGrid);