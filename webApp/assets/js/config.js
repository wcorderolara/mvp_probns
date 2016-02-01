probnsApp.constant("probnsConf", {
  api: {
    url: "http://localhost:3000",
    format: "format=json"
  },
  loading: {
    message: '<div class="loadingMore"></div><span class="loadingMoreText">{{message}}</span>',
    baseZ: 2000,
    css:{border :'none', padding:'20px', backgroundColor:'transparent', top: '30%'},
    overlayCSS: {backgroundColor: '#fff', opacity: 0.8}
  },
  security:{
    loggedUserInformation: "probnsLoggedUserInformation",
    selectedRole: "probnsSelectedRole",
    selectedCliente: "probnsSelectedCliente",
    selectedVendedor: "probnsSelectedVendedor",
  },
  templates: {
    dashboard: "/Dashboard/views/dashboard.html",
    loginUser: "/views/login.html",
    logoutUser: "/LogoutUser/views/index.html",
    menu: "/Menu/views/menu.html",
    listings: "/Listings/views/listings.html"
  },
  roles:{
    agencia:{
      name: "ROLE_AGENCIA",
      templates:{}
    },
    agente: {
      name: "ROLE_AGENTE",
      templates: {}
    },
    desarrolladora: {
      name: "ROLE_DESARROLLADORA",
      templates: {}
    },
    vendedor: {
      name: "ROLE_VENDEDOR",
      templates: {}
    }
  },
  time:{
    format: "dd/mm/yyyy"
  },
  global: {
    currencySymbol: "$",
    decimalPlaces: 0,
    percentageSymbol: "%"
  }
})
