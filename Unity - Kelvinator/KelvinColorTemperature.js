#pragma strict



 var floatR: float[] = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9068, 0.7657, 0.6736, 0.6096, 0.563, 0.5277];
 var floatG: float[] = [0.0087, 0.2567, 0.4767, 0.6535, 0.7915, 0.8986, 0.8903, 0.8018, 0.7403, 0.6955, 0.6615, 0.635];
 var floatB: float[] = [0, 0.0081, 0.1536, 0.3772, 0.6282, 0.875, 1, 1, 1, 1, 1, 1];
 var keysR: Keyframe[];// = [(0,1.0),(1, 1.0),(2, 1.0),(3, 1.0),(4, 1.0),(5, 1.0),(6, 0.9068),(7, 0.7657),(8, 0.6736),(9, 0.6096),(10, 0.563),(11 0.5277)];;
 var keysG: Keyframe[];
 var keysB: Keyframe[];
 var curveR: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
 var curveG: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
 var curveB: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
var autoUpdate: boolean;
var kelvinColour: Color;
@Range(1000, 12000)
var temperature: float;
private var ready : boolean;
@script ExecuteInEditMode()

function iStart() {
    keysR = new Keyframe[floatR.Length];
    keysG = new Keyframe[floatG.Length];
    keysB = new Keyframe[floatB.Length];

    for (var i: int = 0; i < floatR.Length; i++) {
        keysR[i] = new Keyframe(0.0 + i, floatR[i]);
        keysG[i] = new Keyframe(0.0 + i, floatG[i]);
        keysB[i] = new Keyframe(0.0 + i, floatB[i]);
    }
    
    curveR = new AnimationCurve(keysR);
    curveG = new AnimationCurve(keysG);
    curveB = new AnimationCurve(keysB);
    ready = true;
}

function OnValidate() {
    //Start();
    var newTemp = (temperature / 1000) - 1;
    kelvinColour.r = curveR.Evaluate(newTemp);
    kelvinColour.g = curveG.Evaluate(newTemp);
    kelvinColour.b = curveB.Evaluate(newTemp);
    if (autoUpdate == true && ready == true) {
        SetLight();
    }
}

function SetLight() {
    this.GetComponent(Light).color = kelvinColour;
}

function Match() {
    temperature = 1000.0;
}

function Candle() {
    temperature = 2000.0;
}

function Incandescant() {
    temperature = 2700.0;
}

function Halogen() {
    temperature = 3000.0;
}

function Fluorescent() {
    temperature = 3500.0;
}

function Moonlight() {
    temperature = 4000.0;
}

function Daylight() {
    temperature = 6000.0;
}

function Overcast() {
    temperature = 7500.0;
}

function Skylight() {
    temperature = 10000.0;
}

