angular.module('probnsApp')
  .constant("probnsConf", {
  api: {
    // url: "http://localhost:3000",
    url: "http://ec2-52-37-254-25.us-west-2.compute.amazonaws.com/",
    format: "format=json"
  },
  loading: {
    message: '<div class="loadingMore"></div><span class="loadingMoreText">{{message}}</span>',
    baseZ: 2000,
    css:{border :'none', padding:'20px', backgroundColor:'transparent', top: '30%'},
    overlayCSS: {backgroundColor: '#fff', opacity: 0.8}
  },
  // security:{
  //   loggedUserInformation: "probnsLoggedUserInformation",
  //   selectedRole: "probnsSelectedRole",
  //   selectedCliente: "probnsSelectedCliente",
  //   selectedVendedor: "probnsSelectedVendedor",
  // },
  templates: {
    dashboard: "/templates/profile.html",
    agentes: "/templates/agents.html",
    clientes: "/templates/clients.html",
    loginUser: "/templates/login.html",
    logoutUser: "/templates/login.html",
    signinUser: "/templates/signin.html",
    menu: "/Menu/views/menu.html",
    listings: "/templates/listings.html",
    propertyDetails: "/templates/property_view.html",
    addProperty: "/templates/new_property.html",
    addPropertyStep1: "/templates/new_property1.html",
    addPropertyStep2: "/templates/new_property2.html",
    addPropertyStep3: "/templates/new_property3.html",
    addPropertyStep4: "/templates/new_property4.html"    
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
