/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package App;

/**
 *
 * @author erick
 */
public class Errores {
    
    
    public String tipoError;
    public String valorError;
    public int fila;
    public int columna;

    public Errores(String tipoError, String valorError, int fila, int columna) {
        this.tipoError = tipoError;
        this.valorError = valorError;
        this.fila = fila;
        this.columna = columna;
    }

    public String getTipoError() {
        return tipoError;
    }

    public void setTipoError(String tipoError) {
        this.tipoError = tipoError;
    }

    public String getValorError() {
        return valorError;
    }

    public void setValorError(String valorError) {
        this.valorError = valorError;
    }

    public int getFila() {
        return fila;
    }

    public void setFila(int fila) {
        this.fila = fila;
    }

    public int getColumna() {
        return columna;
    }

    public void setColumna(int columna) {
        this.columna = columna;
    }
    
    
    
}
