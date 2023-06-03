import 'package:attendance_management_system/Walkthrough%20Screens/firstScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/fourthScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/secondScreen.dart';
import 'package:attendance_management_system/Walkthrough%20Screens/thirdScreen.dart';
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
              children: const [
                firstScreen(),
                secondScreen(),
                thirdScreen(),
                fourthScreen(),
              ],
            ),
            Container(
              // height: 10,
              // width: 3,
              alignment: Alignment(0, 0.5),
              child:
                  //     GestureDetector(
                  //       onTap: () {
                  //         _pagecontroller.previousPage(
                  //           duration: Duration(milliseconds: 280),
                  //           curve: Curves.linear,
                  //         );
                  //       },
                  //       child: const Icon(
                  //         Icons.arrow_back_ios_new_rounded,
                  //         color: Color(0xFF5e66e0),
                  //       ),
                  //     ),
                  SmoothPageIndicator(
                controller: _pagecontroller,
                count: 4,
                effect: const ExpandingDotsEffect(
                  dotHeight: 10,
                  dotWidth: 10,
                  activeDotColor: Color(0xFF5e66e0),
                  // verticalOffset: 20,
                ),
              ),
              //     GestureDetector(
              //       onTap: () {
              //         _pagecontroller.nextPage(
              //           duration: Duration(milliseconds: 280),
              //           curve: Curves.easeIn,
              //         );
              //       },
              //       child: const Icon(
              //         Icons.arrow_forward_ios_rounded,
              //         color: Color(0xFF5e66e0),
              //       ),
              //     )
              //   ],
              // ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 640),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  SizedBox(
                    height: 50,
                    width: 80,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF5e66e0),
                        elevation: 7,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onPressed: () {
                        _pagecontroller.jumpToPage(3);
                      },
                      child: const Text(
                        "Skip",
                        style: TextStyle(
                          // color: Color(0xFF5e66e0),
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    width: 50,
                  ),
                  SizedBox(
                    height: 50,
                    width: 80,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF5e66e0),
                        elevation: 7,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      ),
                      onPressed: () {
                        _pagecontroller.nextPage(
                            duration: Duration(milliseconds: 200),
                            curve: Curves.easeIn);
                      },
                      child: const Text(
                        "Next",
                        style: TextStyle(
                          // color: Color(0xFF5e66e0),
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
