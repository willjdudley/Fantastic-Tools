using System.Collections;
using System.Collections.Generic;
using UnityEngine;


	[ExecuteInEditMode]
public class reflectionOffset : MonoBehaviour {
public Transform cam;
public Transform floor;
public ReflectionProbe probe;
public float waterOffset;
public float buffer;

	// Use this for initialization
	void Awake () {
		probe  = this.GetComponent<ReflectionProbe>();
	}
	
	// Update is called once per frame
	void Update () {
		if (this.GetComponent<ReflectionProbe>().enabled) {
			Vector3 loc = new Vector3(cam.transform.position.x,-cam.transform.position.y + (2.0f * floor.position.y),cam.transform.position.z);
			this.transform.position = loc;
			//Vector3 size = new Vector3(10000f,2 * cam.transform.position.y + buffer + waterOffset,10000f);
			//probe.size = size;
			probe.RenderProbe();
		}
	}
}
