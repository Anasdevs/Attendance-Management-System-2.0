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
