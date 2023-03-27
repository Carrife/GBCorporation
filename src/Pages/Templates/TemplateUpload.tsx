import { ChangeEvent} from "react";
import Modal from "../../Components/Modal/Modal";
import'../../Components/Modal/Modal.css';

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
        <Modal active={props.active} setActive={props.setActive} type=''>
                <label className="modal_label">File</label>
                <br/>     
                <input type="file" name="file" onChange={(e) => templateUpload(e)}/>  
        </Modal>             
    )
}

export default TemplateUpload;