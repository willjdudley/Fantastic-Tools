using UnityEditor;
using UnityEngine;
using System.Collections.Generic;

public class FantasticDuplicator : EditorWindow
{
   
    // Add menu item named "My Window" to the Window menu
    [MenuItem("WTools/Fantastic Duplicator")]
    public static void ShowWindow()
    {
        //Show existing window instance. If one doesn't exist, make one.
        EditorWindow.GetWindow(typeof(FantasticDuplicator));
    }
    
    GameObject building;
    GameObject floor;
    GameObject currentSelection;
    GameObject[] currentSelectionMany;
    List<int> sourceInts;
    int highestInt;

    void OnGUI()
    {
        /* (
            GUILayout.Button ("Duplicate Object")
        )
        {
            SmartDuplicate();
            }*/
        
        if (
            GUILayout.Button ("Duplicate")
        )
        {
            SmartDuplicateMany();
            }
        /*if (
        	GUILayout.Button ("Duplicate Object Incremental")
        )
        {
            SmartDuplicateIncremental();
 			}*/
        
        if (
            GUILayout.Button ("Duplicate Incremental")
        )
        {
            SmartDuplicateManyIncremental();
        }
        /*if (
            GUILayout.Button ("Name Grabberer")
        )
        {
            Grabberer();
        }
        if (
            GUILayout.Button ("Dename")
        )
        {
            Dename();
        }*/
    }



    void SmartDuplicateManyIncremental(){
        foreach (GameObject sourceObject in currentSelectionMany)
            {
                string stringy = sourceObject.name;
            for (int i = 0; i > stringy.Length; i++)
                {
                    char character = sourceObject.name[stringy.Length-i];
                    if( System.Char.IsDigit (character)){
                        Debug.Log("It be a number");
                    }
                    Debug.Log(sourceObject.name[stringy.Length-i]);
                }  
            }

}


        void LeaveMe(){
        currentSelectionMany = Selection.gameObjects;
        highestInt = 0;
        foreach (GameObject sourceObject in currentSelectionMany)
        {
             if (int.Parse(sourceObject.name) > highestInt)
             {
                highestInt = int.Parse(sourceObject.name);
             }
        }
            foreach (GameObject sourceObject in currentSelectionMany)
        { 
            highestInt++;
             GameObject newObject = Instantiate(sourceObject , sourceObject .transform.position,sourceObject .transform.rotation);  
            newObject.name = "" + highestInt.ToString("00");
            newObject.transform.parent = sourceObject.transform.parent;
            Selection.activeGameObject = newObject;
        }
    }


void SmartDuplicateMany(){
    currentSelectionMany = Selection.gameObjects;

    foreach (GameObject sourceObject in currentSelectionMany)
        { 
            //for (int i; sourceObject.name.length; i++)
            //{
                //Debug.Log("sourceObject.name[sourceObject.name.length-i]");
            //}    
           /* GameObject newObject = Instantiate(sourceObject , sourceObject .transform.position,sourceObject .transform.rotation);  
            newObject.name = sourceObject.name;
            newObject.transform.parent = sourceObject.transform.parent;
            Selection.activeGameObject = newObject;*/
        }
    }

    void Grabberer(){
    currentSelectionMany = Selection.gameObjects;

    foreach (GameObject sourceObject in currentSelectionMany)
        { 
            if (sourceObject.GetComponent<flatHotSpot>().renamed == false) {
                sourceObject.GetComponent<flatHotSpot>().renamed = true;
                sourceObject.GetComponent<flatHotSpot>().originalName = sourceObject.name;
                sourceObject.name = sourceObject.transform.parent.transform.parent.name + "" + sourceObject.transform.parent.name + "" + sourceObject.name; 
            }
            else
            {
                Debug.LogWarning(sourceObject.name + " was already renamed - Ignoring");
            }
        }
    }
    void Dename(){
    currentSelectionMany = Selection.gameObjects;

    foreach (GameObject sourceObject in currentSelectionMany)
        { 
        sourceObject.GetComponent<flatHotSpot>().renamed = false;
        sourceObject.name = sourceObject.GetComponent<flatHotSpot>().originalName;
        }
    }
}
