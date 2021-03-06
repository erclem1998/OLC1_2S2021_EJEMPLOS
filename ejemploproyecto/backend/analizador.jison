/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%options case-insensitive
%x string

%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"clase"               return 'clase'
"decimal"             return 'decimal'
"cadena"              return 'cadena'
"bandera"             return 'bandera'
"true"                return 'true'
"false"               return 'false'
"cout"                return 'cout'
"while"                return 'while'
"start"                return 'start'
"with"                return 'with'




"{"                   return 'llaveA'
"}"                   return 'llaveC'
";"                   return 'ptcoma'
"||"                   return 'or'
"&&"                   return 'and'
"=="                   return 'igualigual'
"!="                   return 'diferente'
"<="                   return 'menorigual'
">="                   return 'mayorigual'
"<"                   return 'menor'
">"                   return 'mayor'
"!"                   return 'not'
"*"                   return 'multi'
"/"                   return 'div'
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
","                   return 'coma'
"PI"                  return 'PI'
"E"                   return 'E'

([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador'

["]                          {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                  {cadena+="\n";}
<string>\s                  {cadena+=" ";}
<string>"\\t"                  {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                  {yytext=cadena; this.popState(); return 'cadenatexto';}

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    const TIPO_OPERACION = require('./controller/Enums/TipoOperacion')
    const TIPO_VALOR = require('./controller/Enums/TipoValor')
    const TIPO_DATO = require('./controller/Enums/TipoDato')
    const INSTRUCCION = require('./controller/Instruccion/Instruccion')
%}

/* operator associations and precedence */

%right 'or'
%right 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo'
%left 'exponente'
%left umenos

%start INICIO

%% /* language grammar */

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF {return $4}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1}
              | CUERPO {$$=[$1]}
;

CUERPO: DEC_VAR {$$ = $1}
      | AS_VAR {$$=$1}
      | DEC_MET {$$=$1}
      | STARTWITH {$$=$1}
;

DEC_VAR: TIPO identificador ptcoma {$$= INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1)}
       | TIPO identificador menor menos EXPRESION ptcoma {$$= INSTRUCCION.nuevaDeclaracion($2, $5, $1, this._$.first_line, this._$.first_column+1)}
;

TIPO: decimal {$$=TIPO_DATO.DECIMAL}
    | cadena {$$=TIPO_DATO.CADENA}
    | bandera {$$=TIPO_DATO.BANDERA}
;

AS_VAR: identificador menor menos EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $4,this._$.first_line, this._$.first_column+1)}
;

EXPRESION: EXPRESION suma EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA, this._$.first_line, this._$.first_column+1)}
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION modulo EXPRESION
         | EXPRESION exponente EXPRESION
         | menos EXPRESION %prec umenos
         | EXPRESION igualigual EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL, this._$.first_line, this._$.first_column+1)}
         | EXPRESION diferente EXPRESION
         | EXPRESION menor EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR, this._$.first_line, this._$.first_column+1)}
         | EXPRESION menorigual EXPRESION
         | EXPRESION mayor EXPRESION
         | EXPRESION mayorigual EXPRESION
         | EXPRESION or EXPRESION
         | EXPRESION and EXPRESION {$$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND, this._$.first_line, this._$.first_column+1)}
         | not EXPRESION
         | parA EXPRESION parC
         | NUMBER {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line, this._$.first_column+1)}
         | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line, this._$.first_column+1)}
         | false {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line, this._$.first_column+1)}
         | cadenatexto {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.CADENA, this._$.first_line, this._$.first_column+1)}
         | identificador {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.IDENTIFICADOR, this._$.first_line, this._$.first_column+1)}
;

DEC_MET: identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($1, null, $5, this._$.first_line, this._$.first_column+1)}
       | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($1, $3, $6, this._$.first_line, this._$.first_column+1)}
;

LISTAPARAMETROS: LISTAPARAMETROS coma PARAMETROS {$1.push($3); $$=$1}
               | PARAMETROS {$$=[$1]}
;

PARAMETROS: TIPO identificador {$$= INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1)}
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO {$1.push($2); $$=$1}
              | CUERPOMETODO {$$=[$1]}
;

CUERPOMETODO: DEC_VAR {$$=$1}
            | AS_VAR {$$=$1}
            | IMPRIMIR {$$=$1}
            | LLAMADA_METODO {$$=$1}
            | WHILE {$$=$1}
;

IMPRIMIR: cout menor menor EXPRESION ptcoma{$$= new INSTRUCCION.nuevoCout($4,this._$.first_line, this._$.first_column+1)}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6, this._$.first_line, this._$.first_column+1)}
;

STARTWITH: start with identificador parA parC ptcoma {$$= INSTRUCCION.nuevoStartWith($3, null, this._$.first_line, this._$.first_column+1)}
         | start with identificador parA LISTAVALORES parC ptcoma {$$= INSTRUCCION.nuevoStartWith($3, $5, this._$.first_line, this._$.first_column+1)}
; 

LISTAVALORES: LISTAVALORES coma EXPRESION {$1.push($3); $$=$1}
            | EXPRESION {$$=[$1]}
;

LLAMADA_METODO: identificador parA parC ptcoma {$$= INSTRUCCION.nuevaLlamada($1, null, this._$.first_line, this._$.first_column+1)}
              | identificador parA LISTAVALORES parC ptcoma {$$= INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line, this._$.first_column+1)}
;
/*
clase proyecto1 { 
    decimal var1 < - (2^2)%5==true   ; 
    decimal var2 <- 2/2-9; 
    bandera flag <- false; 
    cadena nombre <- "Hola mundo"; 
    cout << "este es un print"; 
    while (1+2-3) {} 
    } 
*/


/*expressions
    : e EOF
        {return $1;}
    ;
*/
/*e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
*/