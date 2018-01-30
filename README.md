# belatrix
Repositorio con ejercicio tecnico para entrevista.

La aplicacion recibe un archivo plano/texto con "ubigeos" (Departamento / Provincia / Distrito). Valida si el formato del archivo es correcta y retorna
tres arrays con objetos de JavaScript con dichos "ubigeos" dividos por "Departamento", "Provincia" y "Distrito" a la misma pagina donde se cargo el archivo.

Ejemplo de formato del archivo plano/texto:

“01 Lima /  / ”

“01 Lima / 50 Lima / ”

“01 Lima / 51 Barranca / ”

“01 Lima / 50 Lima / 202 La Molina”

“01 Lima / 50 Lima / 203 San Isidro”

“02 Arequipa /  / ”

“02 Arequipa / 63 Arequipa / ”

“02 Arequipa / 64 Caylloma / ”

“02 Arequipa / 63 Arequipa / 267 Cercado”


Los arrays devueltos tras procesar un archivo como el anterior serian:

<b>Departamentos</b>
<pre>[{"codigo":"01","nombre":"Lima"},{"codigo":"02","nombre":"Arequipa"}]</pre>
<b>Provincias</b>
<pre>[{"codigo":"50","nombre":"Lima","departamento":{"codigo":"01","nombre":"Lima"}},{"codigo":"51","nombre":"Barranca","departamento":{"codigo":"01","nombre":"Lima"}},{"codigo":"63","nombre":"Arequipa","departamento":{"codigo":"02","nombre":"Arequipa"}},{"codigo":"64","nombre":"Caylloma","departamento":{"codigo":"02","nombre":"Arequipa"}}]</pre>
<b>Distritos</b>
<pre>[{"codigo":"202","nombre":"La Molina","provincia":{"codigo":"50","nombre":"Lima","departamento":{"codigo":"01","nombre":"Lima"}}},{"codigo":"203","nombre":"San Isidro","provincia":{"codigo":"50","nombre":"Lima","departamento":{"codigo":"01","nombre":"Lima"}}},{"codigo":"267","nombre":"Cercado","provincia":{"codigo":"63","nombre":"Arequipa","departamento":{"codigo":"02","nombre":"Arequipa"}}}]</pre> 

