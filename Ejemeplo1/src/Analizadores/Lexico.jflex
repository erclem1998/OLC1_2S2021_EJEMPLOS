package Analizadores;
import java_cup.runtime.*;


%%

%class Lexico
%cupsym sym
%cup 
%public
%unicode
%line 
%column
%ignorecase

%init{
    
%init}

//SECCIÓN DE EXPRESIONES REGULARES
blancos = [ \t\r\n]+
entero = [0-9]+ //1,2,45,1990
decimal = [0-9]+"."[0-9]+

%%

//SECCIÓN DE SIMBOLOS
"+" {return new Symbol(sym.suma, yycolumn, yyline,yytext());}
"-" {return new Symbol(sym.resta, yycolumn, yyline,yytext());}
"*" {return new Symbol(sym.multi, yycolumn, yyline,yytext());}
"/" {return new Symbol(sym.division, yycolumn, yyline,yytext());}

//SALTO DE LINEA Y BLANCOS
\n {yyline=1;}
{blancos} {/*se ignoran estos simbolos*/}

{entero} {return new Symbol(sym.entero, yycolumn, yyline, yytext());}
{decimal} {return new Symbol(sym.decimal, yycolumn, yyline, yytext());}

. {
    System.err.println("error: simbolo no reconocido");
    //erroresProyecto errorL= new erroresProyecto("Simbolo no recono", yytext(), yyline, yyline);
    //listaErrores.add(erroresProyecto);
}