import 'package:flutter/material.dart';

class fourthScreen extends StatefulWidget {
  const fourthScreen({super.key});

  @override
  State<fourthScreen> createState() => _fourthScreenState();
}

class _fourthScreenState extends State<fourthScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 50, left: 20, right: 20),
                child: Image.asset(
                  'assets/images/4.gif',
                  // scale: 0.5,
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              RichText(
                textAlign: TextAlign.center,
                text: const TextSpan(
                  children: [
                    TextSpan(
                      text: "Monthly Report Generation",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
