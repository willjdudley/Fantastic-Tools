#pragma strict


@MenuItem("Will's Tools/Kelvinator")
static
function OpenKTC() {
    EditorWindow.GetWindow(Kelvinator);
}

class Kelvinator extends EditorWindow {

    private
    var floatR: float[] = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9068, 0.7657, 0.6736, 0.6096, 0.563, 0.5277];
    private
    var floatG: float[] = [0.0087, 0.2567, 0.4767, 0.6535, 0.7915, 0.8986, 0.8903, 0.8018, 0.7403, 0.6955, 0.6615, 0.635];
    private
    var floatB: float[] = [0, 0.0081, 0.1536, 0.3772, 0.6282, 0.875, 1, 1, 1, 1, 1, 1];
    private
    var keysR: Keyframe[];
    private
    var keysG: Keyframe[];
    private
    var keysB: Keyframe[];
    private
    var curveR: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
    private
    var curveG: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
    private
    var curveB: AnimationCurve = AnimationCurve.Linear(0, 0, 11, 1);
    private
    var message: String;
    var autoUpdate: boolean;
    var kelvinColour: Color;
    @Range(1000, 12000)
    var temperature: float;
    private
    var ready: boolean;
    //@script ExecuteInEditMode()

    function Start() {
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



    function SetLight() {
        if (Selection.activeGameObject.GetComponent(Light)) {
            Selection.activeGameObject.GetComponent(Light).color = kelvinColour;
        }
    }

    function OnSelectionChange() {
        if (Selection.activeGameObject.GetComponent(Light)) {
            message = "" + Selection.activeGameObject.name;
        } else {
            message = "That's not a light mate!";
        }
        //OnGUI();
    }


    function OnGUI() {

        Start();
        //DrawDefaultInspector();
        GUI.enabled = false;

        EditorGUILayout.TextField("Selected:", message);
        EditorGUILayout.ColorField("", kelvinColour);
        //EditorGUILayout.CurveField (curveR);
        GUI.enabled = true;
        temperature = EditorGUILayout.Slider("Temperature", temperature, 1000, 12000);

        var newTemp = (temperature / 1000) - 1;
        kelvinColour.r = curveR.Evaluate(newTemp);
        kelvinColour.g = curveG.Evaluate(newTemp);
        kelvinColour.b = curveB.Evaluate(newTemp);
        autoUpdate = EditorGUILayout.Toggle("Auto Update Selected", autoUpdate);

        if (autoUpdate == true && ready == true) {
            SetLight();
        }
        //var K: KelvinColorTemperature = target as KelvinColorTemperature;
        if (GUILayout.Button("Set Light Temperature")) {
            SetLight();
        }
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("Match")) {
            temperature = 1000.0;

            if (autoUpdate == true) {
                SetLight();
            }
        }




        if (GUILayout.Button("Candle")) {
            temperature = 2000.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        if (GUILayout.Button("Incandescant")) {
            temperature = 2700.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        GUILayout.EndHorizontal();
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("Halogen")) {
            temperature = 3000.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        if (GUILayout.Button("Fluorescent")) {
            temperature = 3500.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        if (GUILayout.Button("Moonlight")) {
            temperature = 4000.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        GUILayout.EndHorizontal();
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("Daylight")) {
            temperature = 6000.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        if (GUILayout.Button("Overcast")) {
            temperature = 7500.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        if (GUILayout.Button("Skylight")) {
            temperature = 10000.0;


            if (autoUpdate == true) {
                SetLight();
            }
        }
        GUILayout.EndHorizontal();
    }
}