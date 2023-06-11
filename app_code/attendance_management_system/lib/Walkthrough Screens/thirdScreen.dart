import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class thirdScreen extends StatefulWidget {
  const thirdScreen({super.key});

  @override
  State<thirdScreen> createState() => _thirdScreenState();
}

class _thirdScreenState extends State<thirdScreen> {
  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return Scaffold(
          backgroundColor: Colors.white,
          body: SafeArea(
            child: Center(
              child: Column(
                children: [
                  Padding(
                    padding:
                        const EdgeInsets.only(top: 60, left: 40, right: 40),
                    child: Image.asset(
                      'assets/images/3a.gif',
                      // scale: 0.59,
                    ),
                  ),
                  const SizedBox(
                    height: 40,
                  ),
                  RichText(
                    textAlign: TextAlign.center,
                    text: const TextSpan(
                      children: [
                        TextSpan(
                          text: "See or Track your Holidays.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
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
      },
    );
  }
}
