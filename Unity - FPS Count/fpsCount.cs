using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class fpsCount : MonoBehaviour {

  float deltaTime = 0.0f;
  float fps = 0.0f;
  Text tm;

  void Start() {
  	tm = GetComponent<Text>();
  }
 void Update()
 {
     deltaTime += Time.deltaTime;
     deltaTime /= 2.0f;
     fps = 1.0f/deltaTime;
     tm.text = (int) fps + " fps";
 }
}
