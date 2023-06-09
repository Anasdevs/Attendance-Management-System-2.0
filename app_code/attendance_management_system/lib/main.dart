import 'package:attendance_management_system/Screens/demoHomeScreen.dart';
import 'package:attendance_management_system/Screens/loginScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/WalkthroughScreen.dart';
import 'package:attendance_management_system/utils/routes.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
      theme: ThemeData.light().copyWith(
        textTheme: GoogleFonts.adventProTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: MaterialApp(
        home: const walkthrough(),
        initialRoute: Routes.wts,
        routes: {
          // "/": (context) => loginScreen(),
          // "/home":(context) => home(),
          "/wts": (context) => const walkthrough(),
        },
      ),
    );
  }
}
