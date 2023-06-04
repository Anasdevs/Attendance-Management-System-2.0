import 'package:flutter/material.dart';

class thirdScreen extends StatefulWidget {
  const thirdScreen({super.key});

  @override
  State<thirdScreen> createState() => _thirdScreenState();
}

class _thirdScreenState extends State<thirdScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 50, left: 60, right: 60),
                child: Image.asset(
                  'assets/images/3.gif',
                  // scale: 0.59,
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
                      text: "See or Track your Holidays.",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'PoppinsSemi',
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
