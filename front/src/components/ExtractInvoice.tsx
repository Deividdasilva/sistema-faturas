// import React, { useState, useRef } from 'react';

// const ExtractInvoice: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleFileSubmit = async () => {
//         if (file) {
//             setLoading(true);
//             const formData = new FormData();
//             formData.append('file', file);

//             try {
//                 const response = await fetch('http://localhost:3000/api/extract-invoice', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 console.log(response, 'response');
//                 if (!response.ok) {
//                     throw new Error(`Erro no servidor: ${response.status}`);
//                 }
//                 const result = await response.json();
//                 console.log(result, 'result');
//                 alert('Arquivo processado com sucesso! Resultados disponíveis no console.');
//             } catch (error: any) {
//                 console.error('Erro ao extrair dados:', error);
//                 setError(error.message || 'Erro desconhecido');
//                 alert(`Erro ao processar arquivo: ${error.message}`);
//             } finally {
//                 setLoading(false);
//                 setFile(null); // Reseta o estado do arquivo
//                 if (fileInputRef.current) {
//                     fileInputRef.current.value = ''; // Limpa o campo de entrada do arquivo
//                 }
//             }
//         } else {
//             alert('Por favor, selecione um arquivo para extrair.');
//         }
//     };

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center' }}>Extrair Fatura</h1>
//             {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
//             <input 
//                 type="file" 
//                 onChange={handleFileChange} 
//                 accept="application/pdf" 
//                 ref={fileInputRef}
//                 style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
//             />
//             <button 
//                 onClick={handleFileSubmit} 
//                 disabled={loading}
//                 style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#007BFF',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '16px',
//                 }}
//             >
//                 {loading ? 'Extraindo...' : 'Extrair Dados'}
//             </button>
//         </div>
//     );
// }

// export default ExtractInvoice;

import React, { useState, useRef } from 'react';

const ExtractInvoice: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileSubmit = async () => {
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3000/api/extract-invoice', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Erro no servidor: ${response.status}`);
                }
                const result = await response.json();
                console.log(result, 'result');
                alert('Arquivo processado com sucesso! Resultados disponíveis no console.');
            } catch (error: any) {
                console.error('Erro ao extrair dados:', error);
                setError(error.message || 'Erro desconhecido');
                alert(`Erro ao processar arquivo: ${error.message}`);
            } finally {
                setLoading(false);
                setFile(null); // Reseta o estado do arquivo
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Limpa o campo de entrada do arquivo
                }
            }
        } else {
            alert('Por favor, selecione um arquivo para extrair.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Extrair Fatura</h1>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <input 
                type="file" 
                onChange={handleFileChange} 
                accept="application/pdf" 
                ref={fileInputRef}
                style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button 
                onClick={handleFileSubmit} 
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                {loading ? 'Extraindo...' : 'Extrair Dados'}
            </button>
        </div>
    );
}

export default ExtractInvoice;
