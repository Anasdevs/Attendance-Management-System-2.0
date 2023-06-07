import 'package:attendance_management_system/Screens/signupScreen.dart';
import 'package:flutter/material.dart';

class homeScreen extends StatefulWidget {
  const homeScreen({super.key});

  @override
  State<homeScreen> createState() => _homeScreenState();
}

class _homeScreenState extends State<homeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            AppBar(
              title: const Text("AMS"),
              centerTitle: true,
              leading: GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => signupScreen(),
                    ),
                  );
                },
                child: Icon(
                  Icons.arrow_back_ios_new_rounded,
                ),
              ),
              backgroundColor: const Color(0xFF5e66e0),
            ),
          ],
        ),
      ),
    );
  }
}
