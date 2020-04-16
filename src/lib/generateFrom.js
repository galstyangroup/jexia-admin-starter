// generateFrom function

// support templates
function optionsTemplate(x) {
    return `<option value="${x.value}">${x.title}</option>`;
}

export default function GenerateFrom(FormModel) {
    let form = "";
    for (let i = 0; i < FormModel.fields.length; i++) {
        switch (FormModel.fields[i].type) {
            case "select":
                form += `
                        <div class="form-group">
                            <label>${FormModel.fields[i].title} </label>
                            <select class="selectpicker"  ${FormModel.fields[i].attr !== undefined ? FormModel.fields[i].attr : "" } name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}" ${FormModel.fields[i].multiple === true ? 'multiple' : ""} >
                                ${FormModel.fields[i].options.map(optionsTemplate).join("")}
                            </select>
                        </div>`;
                break;
            case "checkbox":
                form += `
                          <div class="form-group checkbox">
                            <label class="switch">
                              <input type="checkbox" onchange="window.handeleCheck(this)" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}">
                              <span class="slider"></span>
                            </label>
                            ${FormModel.fields[i].title}
                          </div>`;
                break;
            case "date":
                form += `
                        <div class="form-group">
                             <label>${FormModel.fields[i].title} </label>
                            <input type="date" class="" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}">
                        </div>    
                       `;
                break;
            case "text":
                form += `
                         <div class="form-group">
                             <label>${FormModel.fields[i].title} </label>
                            <input class="form-control" type="text" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}">
                         </div>   
                        `;
                break;
            case "textarea":
                form += `
                         <div class="form-group">
                            <label>${FormModel.fields[i].title} </label>
                            <textarea class="form-control" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}"></textarea>
                         </div>   
                        `;
                break;
            case "hidden":
                form += `
                        <input class="form-control" type="hidden" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}" value="${FormModel.fields[i].value}"></input>    
                        `;
                break;
            case "submit":
                form += `
                             <div class="form-group">
                                <input class="form-control" type="submit" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}" value="${FormModel.fields[i].value}"></input>
                             </div>   
                            `;
                break;
            default:
                form += `
                         <div class="form-group">
                            <label>${FormModel.fields[i].title} </label>
                            <input type="${FormModel.fields[i].type}" name="${FormModel.fields[i].name}" id="${FormModel.fields[i].name}">
                        </div>    
                        `;
        }
    }
    window.handeleCheck = (HG_element) => {
        if (HG_element.value !== true) {
            HG_element.value = true;
        } else {
            HG_element.value = false
        }
    }
    return `<form id="${FormModel.id}" class="${FormModel.class} active" method="${FormModel.method}" onsubmit="return window['${FormModel.submitFunc}'](event)" action="${FormModel.action}" enctype='application/json' > ${form}</form>`;
}