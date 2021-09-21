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

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF {return "finalizado"}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO
              | CUERPO
;

CUERPO: DEC_VAR
      | IMPRIMIR
      | WHILE
;

DEC_VAR: TIPO identificador ptcoma
       | TIPO identificador menor menos EXPRESION ptcoma
;

TIPO: decimal 
    | cadena
    | bandera
;

EXPRESION: EXPRESION suma EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION modulo EXPRESION
         | EXPRESION exponente EXPRESION
         | menos EXPRESION %prec umenos
         | EXPRESION igualigual EXPRESION
         | EXPRESION diferente EXPRESION
         | EXPRESION menor EXPRESION
         | EXPRESION menorigual EXPRESION
         | EXPRESION mayor EXPRESION
         | EXPRESION mayorigual EXPRESION
         | EXPRESION or EXPRESION
         | EXPRESION and EXPRESION
         | not EXPRESION
         | parA EXPRESION parC
         | NUMBER
         | true
         | false
         | cadenatexto
         | identificador
;

IMPRIMIR: cout menor menor EXPRESION ptcoma
;

WHILE: while parA EXPRESION parC llaveA llaveC
;


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