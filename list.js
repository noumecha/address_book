export function getList(addresses) {
    return `<!DOCTYPE html>
    <html>
        <head>
            <title> Adress Book </title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="style.css"/> 
        </head>
            <body>
                <h2 style="
                    text-align:center; 
                    display:block; 
                    padding:10px; 
                    background-color:black;
                    color:white;
                    top:0;
                "
                >
                    Address book
                <h2>
        </body>    
            <table border='1'>    
                <thead>    
                    <tr>   
                        <th>Id</th>   
                        <th>Image</th>
                        <th>First Name</th>   
                        <th>Last Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>delete</th>
                        <th>edit</th>
                    </tr>   
                </thead>
                <tbody>
                    ${addresses.map(createRow).join('')}
                </tbody>
                </tfoot>
                    <th colspan="8">address book v1</th> 
                </tfoot> 
            </table>    
        </body>    
    </html>`
}

function createRow(address) {
    const img = address.file ? `<img src="${address.file}" height="30" width="30">` : '';
    return `<tr>
        <td>${address.id}</td>
        <td>${img}</td> 
        <td>${address.firstname}</td> 
        <td>${address.lastname}</td> 
        <td>${address.street}</td> 
        <td>${address.city}</td> 
        <td>${address.country}</td> 
        <td><a href="/delete/${address.id}">delete</a></td>
        <td><a href="/edit/${address.id}">edit</a></td>
    </tr>`;
}

export default getList