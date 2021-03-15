import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import { formValidatorHandler } from './formValidator';

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
        const formData = getFormData();
        const mergedData = {
            form: formData,
            content: outputData,
        }
        console.log(mergedData);
        const response = await fetch("/admin/event", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(mergedData), // body data type must match "Content-Type" header
        });
        if (response.redirected) {
            window.location.href = response.url;
        }

    } catch (e) {
        console.error("Saving failed", e);
    }
}

const getFormData = () => {
    const formData = [];
    inputs.forEach((input) => {
        formData.push({
            input: input.name,
            value: input.value,
        });
    });
    return formData;
}

const formEvent = document.querySelector("#form-event");
const inputs = formEvent.querySelectorAll("input");
const isValidInputs = [];

formValidatorHandler(inputs, saveBtn, isValidInputs);