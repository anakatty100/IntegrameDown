import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';

const saveBtn = document.querySelector("#save-event-btn");

// Editor Js
const editor = new EditorJS({
    tools: {
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/admin/event/body-image-file', // Your backend file uploader endpoint
                    byUrl: '/admin/body-image-url', // Your endpoint that provides uploading by Url
                }
            }
        }
    },
    onReady: () => {
        //Activate button for saving
        saveBtn.addEventListener("click", saveEditorData);
    }
});

const saveEditorData = async (e) => {
    try {
        const outputData = await editor.save();
        console.log(outputData);
    } catch (e) {
        console.error("Saving failed", e);
    }

}

const formEvent = document.querySelector("#form-event");
const inputs = formEvent.querySelectorAll("input");
const isValidInputs = [];

const inputChangeHandler = (e) => {
    if (e.target.value) {
        for(let i = 0; i < inputs.length;i++) {
            if (inputs[i] === e.target) {
                isValidInputs[i] = true;
                break;
            }
        }
        validateInputHandler();
    }
};

const validateInputHandler = () => {
    let allFormIsValid = true;
    for (let i = 0; i < isValidInputs.length; i++) {
        if (isValidInputs[i] === false) {
            allFormIsValid = false;
            break;
        }
    }
    console.log(isValidInputs);
    console.log("AllFormIsValid: ",allFormIsValid);
    saveBtn.disabled = !allFormIsValid;
};

inputs.forEach((input, i) => {
    input.addEventListener("input", inputChangeHandler);
    isValidInputs[i] = false;
});