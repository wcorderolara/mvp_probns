(function (b, c) {
    var a = function (f, e) {
        var d;
        this.$element = b(f);
        this.options = b.extend({}, b.fn.wizard.defaults, e);
        this.currentStep = 1;
        this.numSteps = this.$element.find("li").length;
        /*Customized to Enable Out Of Wizard Buttons*/
        this.$prevBtn = $('#'+this.$element[0].id+'-actions').find("button.btn-prev");
        this.$nextBtn = $('#' + this.$element[0].id + '-actions').find("button.btn-next");
        /*End Customized to Enable Out Of Wizard Buttons*/
        d = this.$nextBtn.children().detach();
        this.nextText = b.trim(this.$nextBtn.text());
        this.$nextBtn.append(d);
        this.$prevBtn.on("click", b.proxy(this.previous, this));
        this.$nextBtn.on("click", b.proxy(this.next, this));
        this.$element.on("click", "li.complete", b.proxy(this.stepclicked, this));
        this.$stepContainer = this.$element.data("target") || "body";
        this.$stepContainer = b(this.$stepContainer)
    };
    a.prototype = {
        constructor: a,
        setState: function () {
            var n = (this.currentStep > 1);
            var o = (this.currentStep === 1);
            var d = (this.currentStep === this.numSteps);
            this.$prevBtn.attr("disabled", (o === true || n === false));
            var h = this.$nextBtn.data();
            if (h && h.last) {
                this.lastText = h.last;
                if (typeof this.lastText !== "undefined") {
                    var l = (d !== true) ? this.nextText : this.lastText;
                    var f = this.$nextBtn.children().detach();
                    this.$nextBtn.text(l).append(f)
                }
            }
            var j = this.$element.find("li");
            j.removeClass("active").removeClass("complete");
            var m = "li:lt(" + (this.currentStep - 1) + ")";
            var g = this.$element.find(m);
            g.addClass("complete");
            var e = "li:eq(" + (this.currentStep - 1) + ")";
            var k = this.$element.find(e);
            k.addClass("active");
            var i = k.data().target;
            this.$stepContainer.find(".step-pane").removeClass("active");
            b(i).addClass("active");
            this.$element.trigger("changed")
        },
        stepclicked: function (h) {
            var d = b(h.currentTarget);
            var g = this.$element.find("li").index(d);
            var f = b.Event("stepclick");
            this.$element.trigger(f, {
                step: g + 1
            });
            if (f.isDefaultPrevented()) {
                return
            }
            this.currentStep = (g + 1);
            this.setState()
        },
        previous: function () {
            var d = (this.currentStep > 1);
            if (d) {
                var f = b.Event("change");
                this.$element.trigger(f, {
                    step: this.currentStep,
                    direction: "previous"
                });
                if (f.isDefaultPrevented()) {
                    return
                }
                this.currentStep -= 1;
                this.setState()
            }
        },
        next: function () {
            if(this.validateStep(this.currentStep)){
                if(this.currentStep == 4){
                    angular.element(document.getElementById('wizardStep4')).scope().setObservaciones();
                }
                var g = (this.currentStep + 1 <= this.numSteps);
                var d = (this.currentStep === this.numSteps);
                if (g) {
                    var f = b.Event("change");
                    this.$element.trigger(f, {
                        step: this.currentStep,
                        direction: "next"
                    });
                    if (f.isDefaultPrevented()) {
                        return
                    }
                    this.currentStep += 1;
                    this.setState()
                } else {
                    if (d) {
                        this.$element.trigger("finished")
                    }
                }
            }
        },
        validateStep: function(step){
            switch(step){
                case 1:
                    if($('input[name=tipoInmueble]:checked').val() === undefined){
                        $('#errorAlert').html('<strong>Error:</strong> seleccione un tipo de Propiedad').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('input[name=operacionInmueble]:checked').val() === undefined){
                        $('#errorAlert').html('<strong>Error:</strong> seleccione una operacion a realizar con el inmueble').addClass('show');
                        return false
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#cmbPais').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> seleccione un Pais').addClass('show');                   
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#cmbDepartamento').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> seleccione un Departamento').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#cmbMunicipio').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> seleccione un Municipio').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    break;
                case 2:
                    if($('#txtPrecioPropiedad').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Debe ingresar el precio de la propiedad').addClass('show');                   
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#txtShortAddress').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese una direccion descriptiva para la propiedad').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#txtFullAddress').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese la direccion exacta de la propiedad').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    break;
                case 3:
                    if($('#txtExtensionPropiedad').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese la Extensi&oacute;n Territorial de la Propiedad').addClass('show');                   
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#txtAreaPropiedad').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese el area de construcci&oacute;n de la Propiedad').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    if($('#txtAnioPropiedad').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese el A&ntilde;o de construcci&oacute;n').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}

                    break;
                case 4:
                    if($('#txtDescripcionPropiedad').val() == ""){
                        $('#errorAlert').html('<strong>Error:</strong> Ingrese una descripcion de la Propiedad').addClass('show');
                        return false;
                    }else{$('#errorAlert').removeClass('show').addClass('hide');}
                    break;
            }

            return true;
        },
        selectedItem: function (d) {
            return {
                step: this.currentStep
            }
        }
    };
    b.fn.wizard = function (e, g) {
        var f;
        var d = this.each(function () {
            var j = b(this);
            var i = j.data("wizard");
            var h = typeof e === "object" && e;
            if (!i) {
                j.data("wizard", (i = new a(this, h)))
            }
            if (typeof e === "string") {
                f = i[e](g)
            }
        });
        return (f === c) ? d : f
    };
    b.fn.wizard.defaults = {};
    b.fn.wizard.Constructor = a;
    b(function () {
        b("body").on("mousedown.wizard.data-api", ".wizard", function () {
            var d = b(this);
            if (d.data("wizard")) {
                return
            }
            d.wizard(d.data())
        })
    })
})(window.jQuery);