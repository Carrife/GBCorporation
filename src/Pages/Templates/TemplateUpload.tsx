import { ChangeEvent} from "react";
import ModalWindow from "../../Components/Modal/Modal";

const TemplateUpload = (props: {active: boolean, setActive: (active: boolean) => void, id:string, token: string | null}) => {
    const id = props.id;
    
    const templateUpload = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();    
        const userFile = (e.target.files as FileList)[0];
            
        const formData = new FormData();
        formData.append('file', userFile);
        //console.log('file: '+userFile);
                       
        fetch("http://localhost:8000/api/Template/Upload", {                
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, id },
            body: formData        
        });
            
        window.location.reload();
    };
    
    return (
        <ModalWindow title='' isActive={props.active} setActive={props.setActive}>
                <label className="modal_label">File</label>
                <br/>     
                <input type="file" name="file" onChange={(e) => templateUpload(e)}/>  
        </ModalWindow>             
    )
}

export default TemplateUpload;