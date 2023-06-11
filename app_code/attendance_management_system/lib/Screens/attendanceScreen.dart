import 'package:flutter/material.dart';

class attScreen extends StatefulWidget {
  const attScreen({super.key});

  @override
  State<attScreen> createState() => _attScreenState();
}

class _attScreenState extends State<attScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text("Attendance"),
        backgroundColor: Color(0xff5e66e0),
        leading: Icon(
          Icons.arrow_back_ios_new_rounded,
          color: Colors.white,
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Text(
              "Attendance Screen",
            ),
          ],
        ),
      ),
    );
  }
}
