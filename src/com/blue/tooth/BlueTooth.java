package com.blue.tooth;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
public class BlueTooth extends DroidGap {

	@Override
    public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html", 500);
		//setContentView(R.layout.activity_blue_tooth);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.blue_tooth, menu);
		return true;
	}

}
