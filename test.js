const object = {
    who: 'World',
    greet() {
      return this.who;
    },
    farewell: () => {
      return `Goodbye,`+ this.who;
    }
  };

  console.log(object.greet().bind(this))