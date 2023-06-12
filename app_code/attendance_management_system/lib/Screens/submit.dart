import 'package:attendance_management_system/Constants/color.dart';
import 'package:attendance_management_system/Screens/demoHomeScreen.dart';
import 'package:attendance_management_system/Screens/homeScreen.dart';
import 'package:flutter/material.dart';

class submit extends StatefulWidget {
  const submit({super.key});

  @override
  State<submit> createState() => _submitState();
}

class _submitState extends State<submit> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Center(
                child: Padding(
                  padding:
                      const EdgeInsets.only(top: 250, left: 130, right: 130),
                  child: Image.asset(
                    'assets/images/submit.gif',
                    // scale: 0,
                  ),
                ),
              ),
              const SizedBox(
                height: 70,
              ),
              Text(
                "Attendance Submitted Successfully!",
                style: TextStyle(
                    color: btColor, fontSize: 22, fontFamily: "PoppinsSemi"),
              ),
              const SizedBox(
                height: 200,
              ),
              SizedBox(
                height: 50,
                width: 100,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF5e66e0),
                    elevation: 7,
                  ),
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (context) => demo(),
                        ),
                        (route) => false);
                  },
                  child: const Text(
                    "Home",
                    style: TextStyle(
                      // color: Color(0xFF5e66e0),
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                      fontFamily: 'PoppinsSemi',
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
