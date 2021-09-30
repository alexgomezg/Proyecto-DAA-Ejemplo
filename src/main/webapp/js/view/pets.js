var PetView = (function () {
    var dao;

    // Referencia a this que permite acceder a las funciones públicas desde las funciones de jQuery.
    var self;
    var peopleID;

    var formId = 'people-form';
    var listId = 'people-list';
    var formQuery = '#' + formId;
    var listQuery = '#' + listId;

    var humans = []
     var humans_list = []
    function Human(id, name, surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
    var cont=0;
    var daoPeople = new PeopleDAO();
    daoPeople.listPeople(function (people) {
        $.each(people, function (key, human) {
            humans[human.id] = new Human(human.id, human.name, human.surname);
            humans_list[cont] = new Human(human.id, human.name, human.surname);
             cont++;
        });
    },
            function () {
                alert('No has sido posible acceder al listado de personas.');
            });
   

    function PetView(petDao, formContainerId, listContainerId,paramID) {
        peopleID=paramID;
        dao = petDao;
        self = this;
        insertPetForm($('#' + formContainerId), humans_list,humans);
        insertPetList($('#' + listContainerId));
        console.log(humans);

        this.init = function () {
            if(peopleID==="all"){
           dao.listAll(function (people) {
                $.each(people, function (key, pet) {
                    appendToTable(pet, humans);
                });
            },
                    function () {
                        alert('No has sido posible acceder al listado de mascotas.');
                    });
                }else{
             dao.listPetsByPeopleID(peopleID,function (people) {
                $.each(people, function (key, pet) {
                    appendToTable(pet, humans);
                });
            },function () {
                        alert('No has sido posible acceder al listado de mascotas.');
                    });
                }
            // La acción por defecto de enviar formulario (submit) se sobreescribe
            // para que el envío sea a través de AJAX
            $(formQuery).submit(function (event) {
                var pet = self.getPetInForm();

                if (self.isEditing()) {
                    dao.modifyPet(pet,
                            function (pet) {
                                $('#person-' + pet.id + ' td.name').text(pet.name);
                                $('#person-' + pet.id + ' td.surname').text(humans[pet.peopleID].name+" "+humans[pet.peopleID].surname);
                                $('#person-' + pet.id + ' td.pet_type').text(pet.type);
                                self.resetForm();
                            },
                            showErrorMessage,
                            self.enableForm
                            );
                } else {
                    dao.addPet(pet,
                            function (pet) {
                                appendToTable(pet,humans);
                                self.resetForm();
                            },
                            showErrorMessage,
                            self.enableForm
                            );
                }

                return false;
            });

            $('#btnClear').click(this.resetForm);
        };

        this.getPetInForm = function () {
            var form = $(formQuery);
            return {
                'id': form.find('input[name="id"]').val(),
                'name': form.find('input[name="name"]').val(),
                'type': form.find('input[name="type"]').val(),
                'peopleID': document.getElementById('dueno').value
            };
        };

        this.getPetInRow = function (id) {
            var row = $('#person-' + id);

            if (row !== undefined) {
                return {
                    'id': id,
                    'name': row.find('td.name').text(),
                    'type': row.find('td.pet_type').text(),
                    'peopleID': row.find('td.surname').text()
                };
            } else {
                return undefined;
            }
        };

        this.editPet = function (id) {
            var row = $('#person-' + id);

            if (row !== undefined) {
                var form = $(formQuery);

                form.find('input[name="id"]').val(id);
                form.find('input[name="name"]').val(row.find('td.name').text());
                form.find('input[name="surname"]').val(row.find('td.surname').text());
                form.find('input[name="type"]').val(row.find('td.pet_type').text());

                $('input#btnSubmit').val('Modificar');
            }
        };

        this.deletePet = function (id) {
            if (confirm('Está a punto de eliminar a una persona. ¿Está seguro de que desea continuar?')) {
                dao.deletePet(id,
                        function () {
                            $('tr#person-' + id).remove();
                        },
                        showErrorMessage
                        );
            }
        };

        this.isEditing = function () {
            return $(formQuery + ' input[name="id"]').val() != "";
        };

        this.disableForm = function () {
            $(formQuery + ' input').prop('disabled', true);
        };

        this.enableForm = function () {
            $(formQuery + ' input').prop('disabled', false);
        };

        this.resetForm = function () {
            $(formQuery)[0].reset();
            $(formQuery + ' input[name="id"]').val('');
            $('#btnSubmit').val('Crear');
        };
    }
    ;

    

    var returnHumansSelect = function (humans) {
        var toret = "<select id=dueno class=form-control>";
        var cont = 0
        var i=0;
        for (i=0;i<humans.length;i++){
            toret+="<option value="+humans[i].id+">"+humans[i].name+" "+humans[i].surname+"</option>";
        }
        toret+="</select>";
        return toret;
    };
    
    var returnHumanTextBox = function (human) {
        var toret ="<input type=hidden id=dueno value=\""+human.id+"\"/><input name=owner type=text value=\""+human.name+" "
                +human.surname+"\" placeholder=Dueño class=form-control readonly/>";
        return toret;
    };

    var insertPetForm = function (parent, humans,humans_map) {
        var txtToAppend="";
        if(peopleID==='all'){
            txtToAppend=returnHumansSelect(humans);
        }else{
            alert(peopleID);
            txtToAppend=returnHumanTextBox(humans_map[peopleID]);
        }
        parent.append(
                '<form id="' + formId + '" class="mb-5 mb-10">\
				<input name="id" type="hidden" value=""/>\
				<div class="row">\
					<div class="col-sm-2">\
						<input name="name" type="text" value="" placeholder="Nombre" class="form-control" required/>\
					</div>\
                                        <div class="col-sm-2">\
						<input name="type" type="text" value="" placeholder="Tipo" class="form-control" required/>\
					</div>\
                                        <div class="col-sm-1">Dueño:</div>\
					<div class="col-sm-3">'+ txtToAppend +'</div>\
					<div class="col-sm-3">\
                                                <input id="btnSubmit" type="submit" value="Crear" class="btn btn-primary" />\
						<input id="btnClear" type="reset" value="Limpiar" class="btn" />\
					</div>\
				</div>\
			</form>'
                );
    };
    var insertPetList = function (parent) {
        parent.append(
                '<table id="' + listId + '" class="table">\
				<thead>\
					<tr class="row">\
						<th class="col-sm-3">Nombre</th>\
						<th class="col-sm-4">Dueño</th>\
                                                <th class="col-sm-2">Tipo</th>\
						<th class="col-sm-3">&nbsp;</th>\
					</tr>\
				</thead>\
				<tbody>\
				</tbody>\
			</table>'
                );
    };
    var createPetRow = function (pet, human) {
        return '<tr id="person-' + pet.id + '" class="row">\
			<td class="name col-sm-3">' + pet.name + '</td>\
			<td class="surname col-sm-4">' + human[pet.peopleID].name + " " + human[pet.peopleID].surname + '</td>\
                        <td class="pet_type col-sm-2">' + pet.type + '</td>\
			<td class="col-sm-3">\
				<a class="edit btn btn-primary" href="#">Editar</a>\
				<a class="delete btn btn-warning" href="#">Eliminar</a>\
			</td>\
		</tr>';
    };

    var showErrorMessage = function (jqxhr, textStatus, error) {
        alert(textStatus + ": " + error);
    };

    var addRowListeners = function (pet) {
        $('#person-' + pet.id + ' a.edit').click(function () {
            self.editPet(pet.id);
        });

        $('#person-' + pet.id + ' a.delete').click(function () {
            self.deletePet(pet.id);
        });
    };

    var appendToTable = function (pet, humans) {
        $(listQuery + ' > tbody:last')
                .append(createPetRow(pet, humans));
        addRowListeners(pet);
    };

    return PetView;
})();
