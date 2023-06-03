import 'package:attendance_management_system/LoginScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/WalkthroughScreen.dart';
import 'package:attendance_management_system/utils/routes.dart';
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
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MaterialApp(
        home: loginScreen(),
        initialRoute: Routes.wts,
        routes: {
          // "/": (context) => loginScreen(),
          // "/home":(context) => home(),
          "/wts": (context) => walkthrough(),
        },
      ),
    );
  }
}
