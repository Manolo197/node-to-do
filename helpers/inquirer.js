const inquirer = require('inquirer');
require('colors');

const menuOpt=
{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        {
            value: '1',
            name: `${'1.'.blue} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.blue} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.blue} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.blue} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.blue} Completar tareas`
        },
        {
            value: '6',
            name: `${'6.'.blue} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.blue} Salir`
        },
    ]
};

const pausaInput=
{
    type: 'input',
    name: 'pausa',
    message: `Presione ${'ENTER'.blue} para continuar.`
}



const inquirerMenu= async()=>
{
    console.log('===================================='.blue);
    console.log('           Eliga una opción         '.white);
    console.log('====================================\n'.blue);

    const {opcion}= await inquirer.prompt(menuOpt);

    return opcion; 

}

const pausaFunc= async()=>
{
    console.log('\n')
    await inquirer.prompt(pausaInput);
}


const leerInput=async (message)=>
{
    const question= 
    {
        type: 'input',
        name: 'input',
        message,
        validate(value)
        {
            if(value.length===0)
            {
                return 'Por favor ingrese un valor'
            }
            return true
        }

    }

    const {input}= await inquirer.prompt(question);
    return input;
}

const tareasAborrar= async(tareas=[])=>
{
    const choices= tareas.map((tarea, i)=>
        {
            let idx= `${i+1}.`.green;

            return{
                value: tarea.id,
                name: `${idx} ${tarea.desc}`
            }
        })
        choices.unshift(
            {
                value: '0',
                name: '0.'.green +'Cancelar'
            }
        );

        const preguntas= 
        [{
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }];
    
        const {id}= await inquirer.prompt(preguntas);
        return id;
    
}

const confirmar= async(message)=>
{
    const question=
    {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok}= await inquirer.prompt(question);
    return ok;
}


const checkListado= async(tareas=[])=>
{
    const choices= tareas.map((tarea, i)=>
        {
            let idx= `${i+1}.`.green;

            return{
                value: tarea.id,
                name: `${idx} ${tarea.desc}`,
                checked: (tarea.completadoEn)?true:false
            }
        })

        const preguntas= 
        [{
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione:',
            choices
        }];
    
        const {ids}= await inquirer.prompt(preguntas);
        return ids;
    
}



module.exports=
{
    inquirerMenu,
    pausaFunc,
    leerInput,
    tareasAborrar,
    confirmar,
    checkListado
}