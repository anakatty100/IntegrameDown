const util = require('util');


//Block Helpers
const helpers = {
    eachOptionWhitMatchedValue: (list, value, options) => {
        //console.log(util.inspect(options, {showHidden: false, depth: null}))
        console.log(util.inspect(list, { showHidden: false, depth: null }))
        console.log("------------------------------------")
        console.log(value);

        let ret = "";
        // <option value="{{_id}}">{{year}} / {{name}}</option>
        /*         console.log("------------------------------------");
                console.dir(list);
                console.dir(value);
                console.log(value._id.toString()) */
        if (value === undefined || value === null) {
            ret = ret + `<option selected value="">Selecciona una nueva campaña</option>`;
            list.forEach(element => {
                ret = ret + `<option value="${element._id.toString()}">${element.year} / ${element.name} </option>`;
            });
        } else {
            list.forEach(element => {
                //console.log(element._id.toString());
                if (element._id.toString() === value._id.toString()) {
                    ret = ret + `<option selected value="${element._id.toString()}">${element.year} / ${element.name} </option>`;
                } else {
                    ret = ret + `<option value="${element._id.toString()}">${element.year} / ${element.name} </option>`;
                }
            });
        }

        return ret;
    },
};

module.exports = helpers;