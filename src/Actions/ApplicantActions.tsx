import  {Errors, ErrorTitles } from "../Enums/Errors";
import { notification } from 'antd';

export interface Applicant {
    key: string,
    id: number,
    nameEn: string,
    nameRu: string,
    login: string,
    phone: string,
    status: string
}

export interface TestData {
    foreignLanguageTests: [
    {
        foreignLanguage: string,
        foreignLanguageId: number,
        result: number,
        date: string,
        applicantId: number,
        id: number
    }],
    logicTests: [
    {
        result: number,
        date: string,
        applicantId: number,
        id: number
    }],
    programmingTests: [
    {
        programmingLanguage: string,
        programmingLanguageId: number,
        result: number,
        date: string,
        applicantId: number,
        id: number
    }]
}

export interface Language {
    id: number,
    name: string
}

export function GetAllApplicant(token: string) : Promise<Applicant[]>
{
    return fetch("http://localhost:8000/api/Applicant/GetAll", {
        method: 'GET',
        headers: { 'Accept': '*/*', "Authorization": "Bearer " + token },
    })
        .then(response => response.json())
        .then(data => {(data as Applicant[]).forEach(el => Object.assign(el, { key: el.id.toString() })); return data as Applicant[]});
}

export async function CreateApplicant(token:string | null, formValues: any, setActive: (active: boolean) => void,) : Promise<void> 
{    
    const response = await fetch("http://localhost:8000/api/Applicant/Create", {
        method: 'POST',
        headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            NameRu: formValues.nameRu,
            SurnameRu: formValues.surnameRu,
            PatronymicRu: formValues.patronymicRu,
            NameEn: formValues.nameEn,
            SurnameEn: formValues.surnameEn,
            Login: formValues.login,
            Phone: formValues.phone
        })
    });

    if(!response.ok)
    {        
        if(response.status !== undefined)
        {
            notification.error({
                message:  ErrorTitles.ERROR,
                description: Errors[response.status],
            });
            
        }
        else
        {
            response.json().then(data => {
                notification.error({
                    message: ErrorTitles.ERROR,
                    description: Errors[data['errorStatus']],
                })
            });
        }
    }
    else
    {
        notification.success({
            message:  ErrorTitles.SUCCESS,
            description: '',
        });

        setActive(false);
        window.location.reload();
    }
}

export async function GetApplicantById(token: string | null, id: string) : Promise<Applicant>
{
    return await fetch("http://localhost:8000/api/Applicant/GetById", 
    {
        method: 'GET',
        headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json', id},
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data =>  {return data as Applicant})
}

export async function UpdateApplicant(token:string | null, formValues: any, setActive: (active: boolean) => void, applicantId: number) : Promise<void> 
{    
    const response = await fetch("http://localhost:8000/api/Applicant/Update", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id: applicantId,
                NameRu: formValues.nameRu,
                SurnameRu: formValues.surnameRu,
                PatronymicRu: formValues.patronymicRu,
                NameEn: formValues.nameEn,
                SurnameEn: formValues.surnameEn,
                Phone: formValues.phone
            })
        });

        if(!response.ok)
        {        
            if(response.status !== undefined)
            {
                notification.error({
                    message:  ErrorTitles.ERROR,
                    description: Errors[response.status],
                });
                
            }
            else
            {
                response.json().then(data => {
                    notification.error({
                        message: ErrorTitles.ERROR,
                        description: Errors[data['errorStatus']],
                    })
                });
            }   
        }
        else
        {
            notification.success({
                message:  ErrorTitles.SUCCESS,
                description: '',
            });
    
            setActive(false);
            window.location.reload();
        }
}

export async function GetApplicantTestData(token: string, id:string) : Promise<TestData>
{
    return await fetch("http://localhost:8000/api/Applicant/GetTestDatas", {
        method: 'GET',
        headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json', id},
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data =>  {return data as TestData})
}

//Tests
export async function GetForeignLanguages(token: string | null) : Promise<Language[]>
{
    return await fetch("http://localhost:8000/api/SuperDictionary/GetForeignLanguages", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + token}
        })
            .then(response => response.json())
            .then(data => {return data as Language[]})
}

export async function GetProgrammingLanguages(token: string | null) : Promise<Language[]>
{
    return await fetch("http://localhost:8000/api/SuperDictionary/GetProgrammingLanguages", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + token}
        })
            .then(response => response.json())
            .then(data => {return data as Language[]})
}

export async function CreateForeignLanguageTest(token:string | null, formValues: any, setActive: (active: boolean) => void, applicantId: string) : Promise<void> 
{    
    const response = await fetch("http://localhost:8000/api/Applicant/CreateForeignLanguageTestData", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                foreignLanguage: "",
                foreignLanguageId: formValues.language,
                result: formValues.result,
                date: formValues.date,
                applicantId
            })
        });

    if(!response.ok)
    {        
        if(response.status !== undefined)
        {
            notification.error({
                message:  ErrorTitles.ERROR,
                description: Errors[response.status],
            });
            
        }
        else
        {
            response.json().then(data => {
                notification.error({
                    message: ErrorTitles.ERROR,
                    description: Errors[data['errorStatus']],
                })
            });
        }        
    }
    else
    {
        notification.success({
            message:  ErrorTitles.SUCCESS,
            description: '',
        });

        setActive(false);
    }
}

export async function CreateLogicTest(token:string | null, formValues: any, setActive: (active: boolean) => void, applicantId: string) : Promise<void> 
{    
    const response = await fetch("http://localhost:8000/api/Applicant/CreateLogicTestData", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                result: formValues.result,
                date: formValues.date,
                applicantId
            })
        });

    if(!response.ok)
    {
        console.log(response);        
        if(response.status !== undefined)
        {
            notification.error({
                message:  ErrorTitles.ERROR,
                description: Errors[response.status],
            });
            
        }
        else
        {
            response.json().then(data => {
                notification.error({
                    message: ErrorTitles.ERROR,
                    description: Errors[data['errorStatus']],
                })
            });
        }        
    }
    else
    {
        notification.success({
            message:  ErrorTitles.SUCCESS,
            description: '',
        });

        setActive(false);
    }
}

export async function CreateProgrammingLanguageTest(token:string | null, formValues: any, setActive: (active: boolean) => void, applicantId: string) : Promise<void> 
{    
    const response = await fetch("http://localhost:8000/api/Applicant/CreateProgrammingTestData", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                programmingLanguage: "",
                programmingLanguageId: formValues.language,
                result: formValues.result,
                date: formValues.date,
                applicantId
            })
        });

    if(!response.ok)
    {        
        if(response.status !== undefined)
        {
            notification.error({
                message:  ErrorTitles.ERROR,
                description: Errors[response.status],
            });
            
        }
        else
        {
            response.json().then(data => {
                notification.error({
                    message: ErrorTitles.ERROR,
                    description: Errors[data['errorStatus']],
                })
            });
        }        
    }
    else
    {
        notification.success({
            message:  ErrorTitles.SUCCESS,
            description: '',
        });

        setActive(false);
    }
}