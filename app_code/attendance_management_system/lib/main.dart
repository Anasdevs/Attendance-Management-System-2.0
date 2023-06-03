import 'package:attendance_management_system/LoginScreen.dart';
import 'package:attendance_management_system/WalkthroughScreen.dart';
import 'package:attendance_management_system/demoLogin.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: walkthrough(),
      ),
    );
  }
}
