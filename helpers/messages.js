const { Z_ASCII } = require('zlib');

require('colors');

const mostrarMenu= ()=>
{
    return new Promise(resolve=>
        {
            console.clear();
            console.log('===================================='.blue);
            console.log('           Eliga una opción        '.blue);
            console.log('====================================\n'.blue);
        
            console.log(`${'1.'.blue} Crear tareas`)
            console.log(`${'2.'.blue} Listar tareas `)
            console.log(`${'3.'.blue} Listar tareas completadas`)
            console.log(`${'4.'.blue} Listar tareas pendientes`)
            console.log(`${'5.'.blue} Completar tareas`)
            console.log(`${'6.'.blue} Borrar una tarea`)
            console.log(`${'0.'.blue} Salir.\n`)
        
            const readLine= require('readline').createInterface(
                {
                    input: process.stdin,
                    output: process.stdout
                });
        
                readLine.question('Seleccione una opcion: ', 
                (answer)=>
                {
                    readLine.close();
                    resolve(answer);
                });
        });

}

    const pausa=()=>
        {

            return new Promise(resolve=>
                {
                    const readLine= require('readline').createInterface(
                        {
                            input: process.stdin,
                            output: process.stdout
                        });
                
                        readLine.question(`Presione ${'ENTER'.blue} para continuar`, 
                        (answer)=>
                        {
                            readLine.close();
                            resolve(answer);
                        });
                });

        }

module.exports=
{
    mostrarMenu,
    pausa
}