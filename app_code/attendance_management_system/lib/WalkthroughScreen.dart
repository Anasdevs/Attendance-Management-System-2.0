import 'package:attendance_management_system/Walkthrough%20Screens/firstScreen.dart';
import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class walkthrough extends StatefulWidget {
  const walkthrough({super.key});

  @override
  State<walkthrough> createState() => _walkthroughState();
}

class _walkthroughState extends State<walkthrough> {
  //Controller defined to keep the track of pages
  PageController _pagecontroller = PageController();

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(414, 896),
      splitScreenMode: true,
      builder: (context, child) => Scaffold(
        body: Stack(
          children: [
            PageView(
              controller: _pagecontroller,
              children: [
                firstScreen(),
                // Container(
                //   color: Colors.white,
                //   child: Text("First screen"),
                // ),
                Container(
                  color: Colors.white,
                  child: Text("Second screen"),
                ),
                Container(
                  color: Colors.white,
                  child: Text("Third screen"),
                ),
                Container(
                  color: Colors.white,
                  child: Text("Fourth screen"),
                ),
              ],
            ),
            Container(
              alignment: Alignment(0, 0.8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  const Icon(
                    Icons.arrow_back_ios_new_rounded,
                    color: Color(0xFF5e66e0),
                  ),
                  SmoothPageIndicator(
                    controller: _pagecontroller,
                    count: 4,
                    effect: const JumpingDotEffect(
                      activeDotColor: Color(0xFF5e66e0),
                      // verticalOffset: 20,
                    ),
                  ),
                  const Icon(
                    Icons.arrow_forward_ios_rounded,
                    color: Color(0xFF5e66e0),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
