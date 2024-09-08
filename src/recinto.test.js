import { Recinto } from "./Recinto.js";
import * as animais from "./animais.js";

describe("Classe Recinto", () => {

    // Verificando Regra 1
    test("Deve verficar se animal pode morar no bioma", () => {
        const resultado = new Recinto(["savana"],10, []).biomaSuportaAnimal("LEOPARDO");
        expect(resultado).toBe(true);
        });

    test("Deve verficar se animal pode morar no bioma", () => {
        const resultado = new Recinto(["rio"],10, []).biomaSuportaAnimal("LEOPARDO");
        expect(resultado).toBe(false);
    });

    // Verificando Regra 3
    test("Deve verficar que Leão não pode estar no recinto com o macaco", () => {
        const resultado = new Recinto(["savana"],10, [animais.macaco]).mantemHarmonia('LEAO');
        expect(resultado).toBe(false);
        });
    test("Deve verficar que Leão pode estar no recinto, pois está vazio", () => {
        const resultado = new Recinto(["savana"],10, []).mantemHarmonia('LEAO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que Leão pode estar no recinto com outro leão", () => {
        const resultado = new Recinto(["savana"],10, [animais.leao]).mantemHarmonia('LEAO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que Leão não pode estar no recinto com o hipopotamo", () => {
        const resultado = new Recinto(["savana"],10, [animais.hipopotamo]).mantemHarmonia('LEAO');
        expect(resultado).toBe(false);
        });
    test("Deve verficar que gazela pode estar no recinto, pois está vazio", () => {
        const resultado = new Recinto(["savana"],10, []).mantemHarmonia('GAZELA');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que gazela pode estar no recinto com o outra gazela", () => {
        const resultado = new Recinto(["savana"],10, [animais.gazela]).mantemHarmonia('GAZELA');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que macaco pode estar no recinto com a gazela", () => {
        const resultado = new Recinto(["savana"],10, [animais.gazela]).mantemHarmonia('MACACO');
        expect(resultado).toBe(true);
    });

    // Verificando Regra 4
    test("Deve verficar que hipopotamo pode estar no recinto com a gazela", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.gazela]).mantemHarmonia('HIPOPOTAMO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que hipopotamo pode estar no recinto com outro hipopotamo", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.hipopotamo]).mantemHarmonia('HIPOPOTAMO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que hipopotamo pode estar no recinto, pois está vazio", () => {
        const resultado = new Recinto(["savana","rio"],10, []).mantemHarmonia('HIPOPOTAMO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que gazela pode estar no recinto com o hipopotamo", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.hipopotamo]).mantemHarmonia('GAZELA');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que hipopotamo não pode estar no recinto com o leão", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.leao]).mantemHarmonia('HIPOPOTAMO');
        expect(resultado).toBe(false);
        });
    test("Deve verficar que hipopotamo não pode estar no recinto com o leão", () => {
        const resultado = new Recinto(["savana"],10, [animais.gazela]).mantemHarmonia('HIPOPOTAMO');
        expect(resultado).toBe(false);
    });
    
    // Verificando Regra 5
    test("Deve verficar que macaco pode estar no recinto com a gazela", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.gazela]).mantemHarmonia('MACACO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que macaco pode estar no recinto com o hipopotamo", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.hipopotamo]).mantemHarmonia('MACACO');
        expect(resultado).toBe(true);
        });
    test("Deve verficar que macaco não pode estar no recinto, pois está vazio", () => {
        const resultado = new Recinto(["savana","rio"],10, []).mantemHarmonia('MACACO', 1);
        expect(resultado).toBe(false);
        });
    test("Deve verficar que macaco não pode estar no recinto com o leão", () => {
        const resultado = new Recinto(["savana","rio"],10, [animais.leao]).mantemHarmonia('MACACO');
        expect(resultado).toBe(false);
    });
    

});
