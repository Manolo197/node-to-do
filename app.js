const { guardarDB, leerDB } = require('./helpers/guardararchivo');
const {
     
    inquirerMenu, 
    pausaFunc,
    leerInput,
    tareasAborrar,
    confirmar,
    checkListado

    } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/Tareas');

console.clear();

const main= async()=>
{
    let opt='';
    const tareas = new Tareas();

    const tareasDB= leerDB();

    if(tareasDB)
    {
        //Establecer las tareas
        tareas.cargarTareasfromJs(tareasDB);

    }

    do
    {
        opt= await inquirerMenu();
        
        switch(opt)
        {
            case '1':
                //crear Tarea

                const desc= await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
            break;
            case '2':
                //Listar Tareas
                tareas.listarTareas();

            break;
            case '3':
                tareas.listarCompletasOPendientes(true);

            break;
            case '4':
                tareas.listarCompletasOPendientes(false);

            break;
            case '5': //Completado o pendiente.
                    const idts= await checkListado(tareas.listaTareas);
                    tareas.toggleCompletadas(idts);

            break;
            case '6':
                const id= await tareasAborrar(tareas.listaTareas);
                if(id!=='0')
                {
                    const ok = await confirmar('¿Estas seguro que quieres borrar esta tarea?');
                    if(ok)
                    {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente.'.blue)
                    }
                }
            break;
        }

        guardarDB(tareas.listaTareas);


        if(opt!=='0') await pausaFunc();
        console.clear();

    }
    while(opt!=='0');
    
    // pausa();
}

main();